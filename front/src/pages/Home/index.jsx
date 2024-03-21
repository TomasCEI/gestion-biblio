


function Home() {

    const {VITE_NAME, VITE_MODE} = import.meta.env;

    return (
      <>
        <h1>Nuestra libreria HOME</h1>
        <p>Mi nombre es: {VITE_NAME}</p>
      </>
    )
  }

  export default Home;