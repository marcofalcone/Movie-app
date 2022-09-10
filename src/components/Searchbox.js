import '../styles/Searchbox.css'

const Searchbox = (props) => (
  <div className='topRight'>
    <input onChange={(event) => props.setSearch(event.target.value)} className="searchbox" placeholder="search movies ..."></input>
    <img className="userLogo" src="userLogo.png" alt="" />
  </div>
)

export default Searchbox
