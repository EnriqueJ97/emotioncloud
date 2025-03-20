function CSRD() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">CSRD Reporting</h1>
        <p>Completa el formulario para evaluar la sostenibilidad de tu empresa.</p>
        <form className="mt-4">
          <label className="block">¿Usa energías renovables?</label>
          <select className="border p-2 w-full">
            <option>Sí</option>
            <option>No</option>
          </select>
          <button type="submit" className="bg-green-500 text-white p-2 mt-4">Enviar</button>
        </form>
      </div>
    );
  }
  
  export default CSRD;
  