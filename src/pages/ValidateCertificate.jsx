const ValidateCertificate = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Certificate Validation</h1>
        <input type="text" placeholder="Enter Certificate ID" className="mt-4 p-2 border rounded" />
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Verify</button>
      </div>
    );
  };
  
  export default ValidateCertificate;
  