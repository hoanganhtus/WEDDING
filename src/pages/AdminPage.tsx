import { useState, useEffect, useCallback } from "react";
import {
  getRsvpList,
  getWishesList,
  deleteRsvp,
  deleteWish,
  type RsvpEntry,
  type WishEntry,
} from "../lib/api";

type Tab = "rsvp_co_dau" | "rsvp_chu_re" | "wishes";

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
  const [tab, setTab] = useState<Tab>("rsvp_chu_re");
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>([]);
  const [wishesList, setWishesList] = useState<WishEntry[]>([]);
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rsvps, wishes] = await Promise.all([
        getRsvpList(),
        getWishesList(),
      ]);
      setRsvpList(rsvps);
      setWishesList(wishes);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* ─── filter by tab ─── */
  const isRsvpTab = tab === "rsvp_chu_re" || tab === "rsvp_co_dau";
  const rsvpSideFilter: 'chu-re' | 'co-dau' = tab === "rsvp_chu_re" ? "chu-re" : "co-dau";

  const currentRsvpList = rsvpList.filter((r) => r.phia === rsvpSideFilter);

  /* ─── derived stats based on current tab ─── */
  let totalGuests = 0;
  let attending = 0;
  let declined = 0;
  let totalCount = 0;

  if (isRsvpTab) {
    totalGuests = currentRsvpList
      .filter((r) => r.thamDu === "co")
      .reduce((s, r) => s + r.soLuong, 0);
    attending = currentRsvpList.filter((r) => r.thamDu === "co").length;
    declined = currentRsvpList.filter((r) => r.thamDu === "khong").length;
    totalCount = currentRsvpList.length;
  } else {
    totalCount = wishesList.length;
  }

  /* ─── search filter ─── */
  const q = search.toLowerCase();
  const filteredRsvp = currentRsvpList.filter(
    (r) => r.name.toLowerCase().includes(q)
  );
  const filteredWishes = wishesList.filter(
    (w) => w.name.toLowerCase().includes(q) || w.message.toLowerCase().includes(q)
  );

  const handleDeleteRsvp = async (id: string | number) => {
    try {
      await deleteRsvp(id);
      load();
    } catch (error) {
      console.error("Error deleting RSVP:", error);
    }
  };

  const handleDeleteWish = async (id: string | number) => {
    try {
      await deleteWish(id);
      load();
    } catch (error) {
      console.error("Error deleting wish:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      // Delete all entries on current side
      const entriesToDelete = currentRsvpList;
      
      if (isRsvpTab) {
        for (const entry of entriesToDelete) {
          await deleteRsvp(entry.id);
        }
      }
      
      setConfirmClear(false);
      load();
    } catch (error) {
      console.error("Error clearing:", error);
    }
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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 60px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth >= 768 ? "300px 1fr" : "1fr",
            gap: 24,
            alignItems: "start"
          }}
        >
          {/* ─── SIDEBAR ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                height: "80vh",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: 8, marginBottom: 4 }}>
                Quản lý thư mời
              </div>
              <button
                onClick={() => { setTab("rsvp_chu_re"); setSearch(""); setConfirmClear(false); }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: tab === "rsvp_chu_re" ? "rgba(99,102,241,0.15)" : "transparent",
                  color: tab === "rsvp_chu_re" ? "#818cf8" : "#e2e8f0",
                }}
                onMouseEnter={(e) => {
                  if (tab !== "rsvp_chu_re") e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (tab !== "rsvp_chu_re") e.currentTarget.style.background = "transparent";
                }}
              >
                <span>Chú rể</span>
                <span
                  style={{
                    background: tab === "rsvp_chu_re" ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.08)",
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 11,
                    color: tab === "rsvp_chu_re" ? "#fff" : "#94a3b8",
                  }}
                >
                  {rsvpList.filter(r => r.phia === "chu-re").length}
                </span>
              </button>

              <button
                onClick={() => { setTab("rsvp_co_dau"); setSearch(""); setConfirmClear(false); }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: tab === "rsvp_co_dau" ? "rgba(236,72,153,0.15)" : "transparent",
                  color: tab === "rsvp_co_dau" ? "#f472b6" : "#e2e8f0",
                }}
                onMouseEnter={(e) => {
                  if (tab !== "rsvp_co_dau") e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (tab !== "rsvp_co_dau") e.currentTarget.style.background = "transparent";
                }}
              >
                <span>Cô dâu</span>
                <span
                  style={{
                    background: tab === "rsvp_co_dau" ? "rgba(236,72,153,0.7)" : "rgba(255,255,255,0.08)",
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 11,
                    color: tab === "rsvp_co_dau" ? "#fff" : "#94a3b8",
                  }}
                >
                  {rsvpList.filter(r => r.phia === "co-dau").length}
                </span>
              </button>

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" }}></div>

              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: 8, marginBottom: 4 }}>
                Sổ lưu bút
              </div>
              <button
                onClick={() => { setTab("wishes"); setSearch(""); setConfirmClear(false); }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: tab === "wishes" ? "rgba(245,158,11,0.15)" : "transparent",
                  color: tab === "wishes" ? "#fbbf24" : "#e2e8f0",
                }}
                onMouseEnter={(e) => {
                  if (tab !== "wishes") e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (tab !== "wishes") e.currentTarget.style.background = "transparent";
                }}
              >
                <span>Quản lý lời chúc</span>
                <span
                  style={{
                    background: tab === "wishes" ? "rgba(245,158,11,0.7)" : "rgba(255,255,255,0.08)",
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 11,
                    color: tab === "wishes" ? "#fff" : "#94a3b8",
                  }}
                >
                  {wishesList.length}
                </span>
              </button>
            </div>
          </div>

          {/* ─── MAIN CONTENT ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            {/* ─── HEADER / ACTIONS ─── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                {tab === "rsvp_chu_re" && "Xác nhận tham dự - Chú Rể"}
                {tab === "rsvp_co_dau" && "Xác nhận tham dự - Cô Dâu"}
                {tab === "wishes" && "Quản lý lời chúc"}
              </h1>

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

                {/* Refresh */}
                <button
                  onClick={load}
                  disabled={loading}
                  title="Tải lại"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#94a3b8",
                    fontSize: 16,
                    cursor: loading ? "wait" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    opacity: loading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "#fff";
                    }
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

            {/* ─── STAT CARDS ─── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  label: "Tổng bản ghi",
                  value: totalCount,
                  icon: "📋",
                  gradient: "linear-gradient(135deg, #667eea, #764ba2)",
                  show: true,
                },
                {
                  label: "Sẽ tham dự",
                  value: attending,
                  sub: `${totalGuests} khách`,
                  icon: "✅",
                  gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
                  show: isRsvpTab,
                },
                {
                  label: "Không tham dự",
                  value: declined,
                  icon: "❌",
                  gradient: "linear-gradient(135deg, #eb3349, #f45c43)",
                  show: isRsvpTab,
                },
              ].map((card) => card.show ? (
                <div
                  key={card.label}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "20px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
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
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: card.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{card.value}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{card.label}</div>
                    {card.sub && (
                      <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{card.sub}</div>
                    )}
                  </div>
                </div>
              ) : null)}
            </div>

            {/* ─── CLEAR BUTTON (Below Stats, above table) ─── */}
            {isRsvpTab && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                    Xóa tất cả (Danh sách này)
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#f87171" }}>Chắc chắn xóa danh sách này?</span>
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
              </div>
            )}

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
              {isRsvpTab && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {["#", "Họ tên", "Tham dự", "Số khách", "Thời gian", ""].map(
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
                            colSpan={6}
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
                              {r.tenv}
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
                {isRsvpTab
                  ? `Hiển thị ${filteredRsvp.length} / ${currentRsvpList.length} bản ghi`
                  : `Hiển thị ${filteredWishes.length} / ${wishesList.length} lời chúc`}
              </span>
              <span>Dữ liệu lưu trong MySQL database</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
