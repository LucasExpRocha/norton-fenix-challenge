'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map as OlMap, View } from 'ol';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  FaDumbbell,
  FaGraduationCap,
  FaHospital,
  FaLandmark,
  FaPlane,
  FaStore,
  FaTree,
  FaUtensils,
} from 'react-icons/fa';
import { FiFilm, FiMapPin } from 'react-icons/fi';

import Button from '@/components/ui/Button';
import Title from '@/components/ui/Title';

type LocationInfo = {
  id: string;
  name: string;
  description?: string;
  coordinates: number[];
  category: string;
  address?: string;
  icon: string;
  color?: string;
};

type Props = {
  isLoading: boolean;
  infos?: {
    data: {
      locations: LocationInfo[];
    };
  };
};

export default function ClientsMap({ isLoading, infos }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<OlMap | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const overlayElRef = useRef<HTMLDivElement | null>(null);

  const allLocations = useMemo(() => infos?.data?.locations ?? [], [infos]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const l of allLocations) set.add(l.category);
    return ['Todos os tipos', ...Array.from(set)];
  }, [allLocations]);

  const placeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const l of allLocations) {
      const addr = l.address ?? '';
      const m = addr.match(/-\s*([A-Z]{2})\s*$/);
      set.add(m ? m[1] : 'ND');
    }
    return ['Todos os locais', ...Array.from(set)];
  }, [allLocations]);

  const [category, setCategory] = useState<string>('Todos os tipos');
  const [place, setPlace] = useState<string>('Todos os locais');

  const filtered = useMemo(() => {
    return allLocations.filter((l) => {
      const okCat = category === 'Todos os tipos' || l.category === category;
      const addr = l.address ?? '';
      const m = addr.match(/-\s*([A-Z]{2})\s*$/);
      const code = m ? m[1] : 'ND';
      const okPlace = place === 'Todos os locais' || code === place;
      return okCat && okPlace;
    });
  }, [allLocations, category, place]);

  function normalizeInputCoords(coords?: number[]): [number, number] {
    if (!coords || coords.length < 2) return [0, 0];
    const a = Number(coords[1]);
    const b = Number(coords[0]);
    if (Number.isNaN(a) || Number.isNaN(b)) return [0, 0];

    if (a >= -180 && a <= 180 && b >= -90 && b <= 90) return [a, b];

    if (a >= -90 && a <= 90 && b >= -180 && b <= 180) return [b, a];

    return [a, b];
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const base = new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      }),
    });

    vectorSourceRef.current = new VectorSource();
    vectorLayerRef.current = new VectorLayer({
      source: vectorSourceRef.current,
    });

    mapRef.current = new OlMap({
      target: containerRef.current,
      layers: [base, vectorLayerRef.current],
      view: new View({ center: fromLonLat([-51.9253, -14.235]), zoom: 4 }),
      controls: [],
    });

    overlayElRef.current = document.createElement('div');
    overlayElRef.current.className = [
      'pointer-events-auto',
      'rounded-2xl',
      'border',
      'border-white/10',
      'bg-[#141a2f]',
      'text-white',
      'px-3',
      'py-2',
      'text-xs',
      'shadow-[0_12px_12px_0_#0000001A,0_5px_5px_0_#0000000D]',
    ].join(' ');
    overlayRef.current = new Overlay({
      element: overlayElRef.current,
      autoPan: true,
      offset: [0, -15],
      positioning: 'bottom-center',
    });
    mapRef.current.addOverlay(overlayRef.current);

    mapRef.current.on('pointermove', (evt) => {
      const el = mapRef.current?.getTargetElement() as HTMLElement | undefined;
      if (!el) return;
      const hit = !!mapRef.current?.hasFeatureAtPixel(evt.pixel);
      el.style.cursor = hit ? 'pointer' : '';
    });

    mapRef.current.on('click', (evt) => {
      const feature = mapRef.current?.forEachFeatureAtPixel(
        evt.pixel,
        (f) => f
      ) as Feature<Point> | undefined;
      if (!feature) {
        overlayRef.current?.setPosition(undefined);
        return;
      }
      const data = feature.get('data') as LocationInfo | undefined;
      const geom = feature.getGeometry() as Point | undefined;
      if (!geom) return;

      if (data) {
        const color = data.color ?? '#2DB3C8';
        const html = `
          <div>
            <div class="font-semibold" style="color:${color}">${data.name}</div>
            ${data.category ? `<div class="opacity-80">${data.category}</div>` : ''}
            ${data.address ? `<div class="opacity-60 mt-1">${data.address}</div>` : ''}
          </div>
        `;
        if (overlayElRef.current) overlayElRef.current.innerHTML = html;
      }
      overlayRef.current?.setPosition(geom.getCoordinates());
    });
  }, []);

  useEffect(() => {
    if (!vectorSourceRef.current || !mapRef.current) return;
    vectorSourceRef.current.clear(true);

    const iconMap: Record<
      string,
      React.ComponentType<{ color?: string; size?: number }>
    > = {
      'map-pin': FiMapPin,
      film: FiFilm,
      plane: FaPlane,
      tree: FaTree,
      store: FaStore,
      'graduation-cap': FaGraduationCap,
      landmark: FaLandmark,
      dumbbell: FaDumbbell,
      utensils: FaUtensils,
      hospital: FaHospital,
    };

    const makeIconSrc = (name: string, color: string, size = 22) => {
      const Cmp = iconMap[name] ?? FiMapPin;
      const svg = renderToStaticMarkup(<Cmp color={color} size={size} />);
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    };

    const featuresPoint: Feature<Point>[] = [];
    for (const l of filtered) {
      const [lon, lat] = normalizeInputCoords(l.coordinates);
      if (!isFinite(lon) || !isFinite(lat)) continue;
      const f = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        data: l,
      });
      const color = l.color ?? '#2DB3C8';
      const src = makeIconSrc(l.icon, color, 22);
      f.setStyle(
        new Style({
          image: new Icon({ src, scale: 1 }),
        })
      );
      featuresPoint.push(f);
    }

    if (featuresPoint.length > 0)
      vectorSourceRef.current.addFeatures(featuresPoint);

    const srcForFit = vectorSourceRef.current;
    if (srcForFit && srcForFit.getFeatures().length > 0) {
      const extent = srcForFit.getExtent();
      if (extent && isFinite(extent[0])) {
        mapRef.current!.getView().fit(extent, {
          padding: [40, 40, 40, 40],
          duration: 250,
          maxZoom: 11,
        });
      }
    }
  }, [filtered]);

  return (
    <section>
      <div id="cardTop" className="flex justify-between items-center mb-6">
        <Title variant="default">{`Mapa de Clientes`}</Title>
        <div
          id="buttons-filter"
          className="flex-center py-1.5 px-3 gap-3 rounded-3xl"
        >
          <div className="relative">
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              aria-label="Filtrar por local"
              className="font-inter font-normal not-italic text-[14px] leading-[22px] tracking-normal pl-9 pr-8 py-2 md:py-3 bg-[#141a2f] rounded-4xl text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
            >
              {placeOptions.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 16 16"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-80 pointer-events-none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filtrar por tipo"
              className="font-inter font-normal not-italic text-[14px] leading-[22px] tracking-normal pl-9 pr-8 py-2 md:py-3 bg-[#141a2f] rounded-4xl text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
            >
              {categories.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 16 16"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-80 pointer-events-none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{ boxShadow: '0 12px 12px 0 #0000001A,0 5px 5px 0 #0000000D' }}
        />
        <div className="absolute left-4 bottom-4 z-10">
          <Button fullWidth={false} variant="filter" className="px-3 py-2">
            {filtered.length} pontos
          </Button>
        </div>
        <div
          ref={containerRef}
          className="h-[280px] md:h-[340px] w-full rounded-3xl overflow-hidden"
        />
      </div>
    </section>
  );
}
