const Searchbox = (props) => (
  <>
    <input value={props.value} onChange={(event) => props.setSearch(event.target.value)} className="searchbox" placeholder="search movies"></input>
  </>
)

export default Searchbox
