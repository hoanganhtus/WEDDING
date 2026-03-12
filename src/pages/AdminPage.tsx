import { useState, useEffect, useCallback } from "react";
import {
  getRsvpList,
  getWishesList,
  deleteRsvp,
  deleteWish,
  clearAllRsvp,
  clearAllWishes,
  type RsvpEntry,
  type WishEntry,
} from "../lib/storage";

type Tab = "rsvp" | "wishes";

/* ─── helpers ─── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("rsvp");
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>([]);
  const [wishesList, setWishesList] = useState<WishEntry[]>([]);
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const load = useCallback(() => {
    setRsvpList(getRsvpList());
    setWishesList(getWishesList());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* ─── derived stats ─── */
  const totalGuests = rsvpList
    .filter((r) => r.thamDu === "co")
    .reduce((s, r) => s + r.soLuong, 0);
  const attending = rsvpList.filter((r) => r.thamDu === "co").length;
  const declined = rsvpList.filter((r) => r.thamDu === "khong").length;

  /* ─── filter ─── */
  const q = search.toLowerCase();
  const filteredRsvp = rsvpList.filter(
    (r) => r.ten.toLowerCase().includes(q) || r.phia.includes(q)
  );
  const filteredWishes = wishesList.filter(
    (w) => w.name.toLowerCase().includes(q) || w.message.toLowerCase().includes(q)
  );

  const handleDeleteRsvp = (id: string) => {
    deleteRsvp(id);
    load();
  };
  const handleDeleteWish = (id: string) => {
    deleteWish(id);
    load();
  };
  const handleClearAll = () => {
    if (tab === "rsvp") clearAllRsvp();
    else clearAllWishes();
    setConfirmClear(false);
    load();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        color: "#e2e8f0",
      }}
    >
      {/* ─── HEADER ─── */}
      <header
        style={{
          background: "rgba(15,12,41,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            💒
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
            Wedding Admin
          </span>
        </div>
        <a
          href="/"
          style={{
            fontSize: 13,
            color: "#94a3b8",
            textDecoration: "none",
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          ← Xem thiệp
        </a>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 60px" }}>
        {/* ─── STAT CARDS ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {[
            {
              label: "Tổng RSVP",
              value: rsvpList.length,
              icon: "📋",
              gradient: "linear-gradient(135deg, #667eea, #764ba2)",
            },
            {
              label: "Sẽ tham dự",
              value: attending,
              sub: `${totalGuests} khách`,
              icon: "✅",
              gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
            },
            {
              label: "Không tham dự",
              value: declined,
              icon: "❌",
              gradient: "linear-gradient(135deg, #eb3349, #f45c43)",
            },
            {
              label: "Lời chúc",
              value: wishesList.length,
              icon: "💌",
              gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "22px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: card.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{card.label}</div>
                {card.sub && (
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{card.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ─── TAB BAR + ACTIONS ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 4 }}>
            {([
              { key: "rsvp", label: "Xác nhận tham dự", count: rsvpList.length },
              { key: "wishes", label: "Sổ lưu bút", count: wishesList.length },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSearch(""); setConfirmClear(false); }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 10,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: tab === t.key ? "rgba(255,255,255,0.12)" : "transparent",
                  color: tab === t.key ? "#fff" : "#94a3b8",
                }}
              >
                {t.label}
                <span
                  style={{
                    background: tab === t.key ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.08)",
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 11,
                  }}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "8px 14px 8px 34px",
                  color: "#e2e8f0",
                  fontSize: 13,
                  outline: "none",
                  width: 200,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 14,
                  opacity: 0.5,
                }}
              >
                🔍
              </span>
            </div>

            {/* Clear all */}
            {!confirmClear ? (
              <button
                onClick={() => setConfirmClear(true)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.1)",
                  color: "#f87171",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
              >
                Xóa tất cả
              </button>
            ) : (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#f87171" }}>Chắc chắn?</span>
                <button
                  onClick={handleClearAll}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "#94a3b8",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              </div>
            )}

            {/* Refresh */}
            <button
              onClick={load}
              title="Tải lại"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.06)",
                color: "#94a3b8",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              🔄
            </button>
          </div>
        </div>

        {/* ─── TABLE CARD ─── */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* ─── RSVP TABLE ─── */}
          {tab === "rsvp" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {["#", "Họ tên", "Tham dự", "Số khách", "Phía", "Thời gian", ""].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            padding: "14px 16px",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "#94a3b8",
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvp.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        style={{ padding: 48, textAlign: "center", color: "#64748b" }}
                      >
                        <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
                        {search
                          ? "Không tìm thấy kết quả phù hợp"
                          : "Chưa có ai xác nhận tham dự"}
                      </td>
                    </tr>
                  ) : (
                    filteredRsvp.map((r, i) => (
                      <tr
                        key={r.id}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <td style={{ padding: "12px 16px", color: "#64748b" }}>{i + 1}</td>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#fff" }}>
                          {r.ten}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: 20,
                              fontSize: 11,
                              fontWeight: 600,
                              background:
                                r.thamDu === "co"
                                  ? "rgba(16,185,129,0.15)"
                                  : "rgba(239,68,68,0.15)",
                              color: r.thamDu === "co" ? "#34d399" : "#f87171",
                            }}
                          >
                            {r.thamDu === "co" ? "Có" : "Không"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            textAlign: "center",
                            fontWeight: 700,
                            color: r.thamDu === "co" ? "#fff" : "#64748b",
                          }}
                        >
                          {r.thamDu === "co" ? r.soLuong : "—"}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: 20,
                              fontSize: 11,
                              fontWeight: 600,
                              background:
                                r.phia === "nha-trai"
                                  ? "rgba(99,102,241,0.15)"
                                  : "rgba(236,72,153,0.15)",
                              color: r.phia === "nha-trai" ? "#818cf8" : "#f472b6",
                            }}
                          >
                            {r.phia === "nha-trai" ? "Nhà trai" : "Nhà gái"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12 }}>
                          {formatDate(r.createdAt)}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <button
                            onClick={() => handleDeleteRsvp(r.id)}
                            title="Xóa"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              border: "none",
                              background: "rgba(239,68,68,0.1)",
                              color: "#f87171",
                              cursor: "pointer",
                              fontSize: 14,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "rgba(239,68,68,0.25)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                            }
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── WISHES TABLE ─── */}
          {tab === "wishes" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {["#", "Người gửi", "Lời chúc", "Thời gian", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "14px 16px",
                          textAlign: "left",
                          fontWeight: 600,
                          color: "#94a3b8",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredWishes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{ padding: 48, textAlign: "center", color: "#64748b" }}
                      >
                        <div style={{ fontSize: 36, marginBottom: 12 }}>💌</div>
                        {search ? "Không tìm thấy kết quả phù hợp" : "Chưa có lời chúc nào"}
                      </td>
                    </tr>
                  ) : (
                    filteredWishes.map((w, i) => (
                      <tr
                        key={w.id}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <td style={{ padding: "12px 16px", color: "#64748b" }}>{i + 1}</td>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#fff" }}>
                          {w.name}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            maxWidth: 400,
                            lineHeight: 1.6,
                            color: "#cbd5e1",
                          }}
                        >
                          {w.message}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12, whiteSpace: "nowrap" }}>
                          {formatDate(w.created_at)}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <button
                            onClick={() => handleDeleteWish(w.id)}
                            title="Xóa"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              border: "none",
                              background: "rgba(239,68,68,0.1)",
                              color: "#f87171",
                              cursor: "pointer",
                              fontSize: 14,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "rgba(239,68,68,0.25)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
                            }
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ─── FOOTER STATS ─── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            padding: "0 4px",
            fontSize: 12,
            color: "#64748b",
          }}
        >
          <span>
            {tab === "rsvp"
              ? `Hiển thị ${filteredRsvp.length} / ${rsvpList.length} bản ghi`
              : `Hiển thị ${filteredWishes.length} / ${wishesList.length} lời chúc`}
          </span>
          <span>Dữ liệu lưu trong localStorage</span>
        </div>
      </div>
    </div>
  );
}
