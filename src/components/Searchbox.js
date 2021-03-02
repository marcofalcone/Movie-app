import '../styles/Searchbox.css'

const Searchbox = (props) => (
  <>
    <input onChange={(event) => props.setSearch(event.target.value)} className="searchbox" placeholder="search movies ..."></input>
  </>
)

export default Searchbox
