const Loader = () => {
  return (
    <div className="fixed inset-0 bg-navy flex items-center justify-center z-50">
      <div className="text-center">
        <div className="loader-spinner mx-auto mb-6" />
        <h2 className="text-2xl font-playfair font-bold text-white mb-2">Jasmin Paito</h2>
        <p className="text-emerald text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
