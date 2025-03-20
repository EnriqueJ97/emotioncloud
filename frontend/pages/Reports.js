function Reports() {
    const handleDownload = () => {
      alert("Descargando reporte...");
    };
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <p>Pulsa el botón para descargar el informe en PDF.</p>
        <button className="bg-blue-500 text-white p-2 mt-4" onClick={handleDownload}>Descargar PDF</button>
      </div>
    );
  }
  
  export default Reports;
  