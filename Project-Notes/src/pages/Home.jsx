import NavBar from './NavBar'

const Home = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <div className="w-10">
        <iframe className='p-0' src='https://naya.today/' width={1515} height={1525}></iframe>
      </div>
    </>
  )
}

export default Home