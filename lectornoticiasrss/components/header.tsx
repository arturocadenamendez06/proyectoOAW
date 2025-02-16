const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-8 text-center shadow-2xl">
      <h1 className="text-5xl font-extrabold mb-6 animate-fade-in drop-shadow-xl">
        📡 Bienvenido a tu Lector RSS Favorito
      </h1>
      <p className="text-xl max-w-2xl mx-auto animate-slide-in text-background">
        Agrega tus feeds favoritos, mantente actualizado y personaliza tu
        experiencia de lectura de noticias.
      </p>
      <button className="mt-8 px-8 py-4 bg-accent text-white font-semibold rounded-2xl shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-110">
        Empezar Ahora
      </button>
    </header>
  );
};

export default Header;
