const CompanyLogin = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Company Login</h1>
        <input type="text" placeholder="Company Email" className="mt-4 p-2 border rounded" />
        <input type="password" placeholder="Password" className="mt-4 p-2 border rounded" />
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Login</button>
      </div>
    );
  };
  
  export default CompanyLogin;
  