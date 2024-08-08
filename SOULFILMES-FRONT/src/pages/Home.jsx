import banner from "../assets/banner.jpg";

function Home() {
  return (
    <main>
      <div className="conteudo">
        <img src={banner} alt="SoulPet Banner" className="full-size-image" />
      </div>
    </main>
  );
}

export default Home;
