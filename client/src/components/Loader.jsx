export default function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5rem 0" }}>
      <div style={{ width: "40px", height: "40px", border: "2px solid #e8d5b0", borderTopColor: "#d4a853", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
