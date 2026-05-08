import { useEffect, useMemo, useState } from 'react';
import { Filter, LocateFixed, MapPin, MessageCircle, Users } from 'lucide-react';
import { DivIcon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { NearbyMember } from '../types';

interface CommunityMapViewProps {
  members: NearbyMember[];
}

export function CommunityMapView({ members }: CommunityMapViewProps) {
  const [distanceLimit, setDistanceLimit] = useState(8);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(members[0]?.id ?? null);
  const [zoomLevel, setZoomLevel] = useState(13);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (member.distanceKm > distanceLimit) return false;
      if (onlineOnly && !member.online) return false;
      return true;
    });
  }, [members, distanceLimit, onlineOnly]);

  const selectedMember =
    filteredMembers.find((member) => member.id === selectedMemberId) ??
    filteredMembers[0] ??
    null;

  useEffect(() => {
    if (!selectedMember && filteredMembers.length > 0) {
      setSelectedMemberId(filteredMembers[0].id);
    }
  }, [filteredMembers, selectedMember]);

  const clusters = useMemo(() => {
    const threshold = zoomLevel <= 12 ? 0.028 : zoomLevel <= 13 ? 0.022 : 0.015;
    const grouped: Array<{ id: string; lat: number; lng: number; members: NearbyMember[] }> = [];

    filteredMembers.forEach((member) => {
      const existing = grouped.find((group) => {
        const latGap = Math.abs(group.lat - member.lat);
        const lngGap = Math.abs(group.lng - member.lng);
        return latGap < threshold && lngGap < threshold;
      });

      if (existing) {
        existing.members.push(member);
        const count = existing.members.length;
        existing.lat = existing.members.reduce((sum, item) => sum + item.lat, 0) / count;
        existing.lng = existing.members.reduce((sum, item) => sum + item.lng, 0) / count;
      } else {
        grouped.push({ id: member.id, lat: member.lat, lng: member.lng, members: [member] });
      }
    });

    return grouped;
  }, [filteredMembers, zoomLevel]);

  const createAvatarIcon = (member: NearbyMember, isSelected: boolean) =>
    new DivIcon({
      className: '',
      html: `<div style="
        width:${isSelected ? 58 : 52}px;
        height:${isSelected ? 58 : 52}px;
        border-radius:999px;
        border:4px solid ${isSelected ? '#d5e5bd' : '#ffffff'};
        overflow:hidden;
        box-shadow:${isSelected ? '0 0 0 6px rgba(213,229,189,0.45)' : '0 2px 10px rgba(0,0,0,0.2)'};
        position:relative;
        background:#fff;">
          <img src="${member.avatar}" alt="${member.name}" style="width:100%;height:100%;object-fit:cover;" />
          <span style="
            position:absolute;right:-1px;bottom:-1px;width:14px;height:14px;border-radius:50%;
            border:2px solid #fff;background:${member.online ? '#10b981' : '#f59e0b'};"></span>
      </div>`,
      iconSize: [58, 58],
      iconAnchor: [29, 29]
    });

  const createClusterIcon = (count: number) =>
    new DivIcon({
      className: '',
      html: `<div style="
        width:52px;height:52px;border-radius:999px;
        background:#17361d;color:white;border:4px solid #ffffff;
        display:flex;align-items:center;justify-content:center;
        font-weight:700;font-size:16px;box-shadow:0 4px 14px rgba(0,0,0,0.28);">${count}</div>`,
      iconSize: [52, 52],
      iconAnchor: [26, 26]
    });

  return (
    <section className="space-y-4 md:space-y-6 py-4 md:py-6">
      <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-low p-4 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-xs md:text-sm font-semibold text-primary">
              <Users className="h-4 w-4" />
              Cộng đồng quanh bạn
            </p>
            <h2 className="mt-3 text-xl md:text-2xl font-bold text-on-surface">Bản đồ người dùng Plant Doctor - Hà Nội</h2>
            <p className="mt-2 text-sm md:text-base text-on-surface-variant max-w-2xl">
              Chạm vào avatar trên bản đồ để xem thông tin. Giao diện ưu tiên nút to, chữ rõ và màu tương phản cao để dễ thao tác.
            </p>
          </div>
          <button
            type="button"
            className="rounded-2xl border border-outline/40 bg-white px-4 py-3 text-sm md:text-base font-semibold text-primary shadow-sm hover:bg-surface-container-high"
          >
            <LocateFixed className="mr-2 inline h-5 w-5" />
            Xác định vị trí của tôi
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-outline-variant/40 bg-white p-4 md:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base md:text-lg font-bold text-on-surface">Bản đồ khu vực Hà Nội</h3>
            <span className="rounded-full bg-surface-container px-3 py-1 text-xs md:text-sm font-semibold text-on-surface-variant">
              {filteredMembers.length} người trong bán kính
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-outline-variant/40">
            <MapContainer
              center={[21.0285, 105.8542]}
              zoom={13}
              minZoom={11}
              maxZoom={17}
              scrollWheelZoom
              className="h-[380px] md:h-[460px] w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapZoomTracker onZoomChange={setZoomLevel} />
              {clusters.map((cluster) => {
                if (cluster.members.length > 1) {
                  return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      position={[cluster.lat, cluster.lng]}
                      icon={createClusterIcon(cluster.members.length)}
                      eventHandlers={{
                        click: () => setSelectedMemberId(cluster.members[0].id)
                      }}
                    >
                      <Popup>
                        Cụm {cluster.members.length} người dùng gần nhau. Chạm để xem chi tiết.
                      </Popup>
                    </Marker>
                  );
                }

                const member = cluster.members[0];
                const isSelected = selectedMember?.id === member.id;
                return (
                  <Marker
                    key={member.id}
                    position={[member.lat, member.lng]}
                    icon={createAvatarIcon(member, isSelected)}
                    eventHandlers={{
                      click: () => setSelectedMemberId(member.id)
                    }}
                  >
                    <Popup>
                      <p className="font-semibold">{member.name}</p>
                      <p>{member.area}</p>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-on-surface-variant">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              Đang online
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-on-surface-variant">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              Hoạt động gần đây
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-outline-variant/40 bg-white p-4 md:p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base md:text-lg font-bold text-on-surface">
              <Filter className="h-5 w-5 text-primary" />
              Bộ lọc thân thiện
            </h3>

            <label className="block text-sm md:text-base font-semibold text-on-surface">
              Bán kính tìm cộng đồng: {distanceLimit} km
            </label>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={distanceLimit}
              onChange={(event) => setDistanceLimit(Number(event.target.value))}
              className="mt-3 h-3 w-full accent-primary"
            />
            <p className="mt-2 text-xs md:text-sm text-on-surface-variant">
              Kéo thanh để tăng/giảm phạm vi tìm người dùng gần bạn.
            </p>

            <button
              type="button"
              onClick={() => setOnlineOnly((prev) => !prev)}
              className={`mt-4 w-full rounded-2xl border px-4 py-3 text-left text-sm md:text-base font-semibold transition ${
                onlineOnly
                  ? 'border-primary bg-secondary-container text-primary'
                  : 'border-outline/40 bg-surface-container-highest text-on-surface'
              }`}
            >
              {onlineOnly ? 'Đang hiển thị: Chỉ người dùng online' : 'Hiển thị tất cả trạng thái'}
            </button>
          </div>

          <div className="rounded-3xl border border-outline-variant/40 bg-white p-4 md:p-5 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-on-surface">Chi tiết người dùng</h3>
            {selectedMember ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="h-14 w-14 rounded-full border-2 border-secondary-container object-cover"
                  />
                  <div>
                    <p className="text-base md:text-lg font-bold text-on-surface">{selectedMember.name}</p>
                    <p className="text-sm md:text-base text-on-surface-variant">{selectedMember.area}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-container p-3 text-sm md:text-base text-on-surface-variant space-y-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Cách bạn khoảng {selectedMember.distanceKm.toFixed(1)} km
                  </p>
                  <p>
                    Loại cây đang trồng: <span className="font-semibold text-on-surface">{selectedMember.plants.join(', ')}</span>
                  </p>
                  <p>
                    Hỗ trợ: <span className="font-semibold text-on-surface">{selectedMember.support}</span>
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full rounded-2xl botanical-gradient px-4 py-3 text-sm md:text-base font-bold text-white shadow-md"
                >
                  <MessageCircle className="mr-2 inline h-5 w-5" />
                  Nhắn tin trao đổi liên lạc
                </button>
              </div>
            ) : (
              <p className="mt-3 rounded-2xl bg-surface-container px-4 py-3 text-sm md:text-base text-on-surface-variant">
                Không có người dùng phù hợp với bộ lọc hiện tại. Hãy mở rộng bán kính để xem thêm.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapZoomTracker({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  useMapEvents({
    zoomend: (event) => {
      onZoomChange(event.target.getZoom());
    }
  });
  return null;
}
