import { FaArrowCircleLeft, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import '../styles/explore.css';
import { useEffect, useState } from 'react';
import { apiHelper } from '../lib/apiHelper';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default function Explore() {
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const defaultGames = {results:[], previous:null, next:null}
  const [games, setGames] = useState(defaultGames);
  async function getSuggestions(searchTerm){
    const res = await apiHelper.dynamicSearch(searchTerm);  
    if(res.error){
      console.log(res.error);
      return;
    }
    setSuggestions(res);
  }
  useEffect(() => {
    if(searchTerm.trim()===""){
      setSuggestions((prev)=>[])
      return;
    };
    getSuggestions(searchTerm)
  }, [searchTerm])

  const getGames = async (page) => {
    setGames(prev=>defaultGames)
    const res = await apiHelper.fetchGames(page);  
    if(res.error){
      console.log(res.error);
      return;
    }
    setGames((prev)=>res);
  }

  useEffect(() => {
    getGames(page)
  }, [page])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }

  return (
    <div className=" flex flex-col min-h-screen h-full w-full px-6 py-6 ">
      <>
        <div className=' py-3 px-5 border border-slate-100 relative rounded-lg flex flex-row justify-start items-center w-full  h-fit gap-4' >
          <FaSearch color='#ffffff' className=' w-8 h-8 '/>
          <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='GTA VI' className=' outline-none bg-transparent  flex w-full px-4 py-2 text-slate-100 text-2xl font-semibold' />   
        </div>
        <div className=' relative mt-2'>
        <div className=' z-30 absolute top-0 w-full h-fit rounded-lg overflow-clip'>
            {suggestions.map((elem,ind)=>{
              return (
                <Link to={`/games/${elem.id}`} key={`suggestion-${ind}`} >
                <div className={`py-2 px-5 bg-slate-50 hover:bg-zinc-900 text-zinc-950 hover:text-slate-50 transition-all ${ind===suggestions.length-1?"":" border-b border-zinc-400"}`} >
                  <h2 className=' text-xl font-semibold '>{elem.name}</h2>
                </div>
                </Link>
              )
            })}
          </div>
        </div>
        </>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen'>
          {games.results.length>0?
          games.results.map((elem,ind)=><GameCard key={`game-${ind}`} game={elem} />)
          :
          <div className=' col-span-1 md:col-span-2 lg:col-span-3 h-full'>
          <Loader/>
          </div>
        }
        </div>
        <div className=' flex flex-row px-6 w-full py-6 justify-between items-center'>
          <button onClick={()=>{setPage((prev)=>prev-1);scrollToTop()}} className={`${!games.previous?"opacity-0 pointer-events-none":""} py-3 px-5 rounded-lg bg-yellow-500 hover:bg-zinc-950 border-zinc-950 hover:border-yellow-500 text-zinc-950 hover:text-yellow-500 transition-all font-bold text-lg `}>
            <FaChevronLeft />
          </button>
          <button onClick={()=>{setPage((prev)=>prev+1);scrollToTop()}} className={`${!games.next?"opacity-0 pointer-events-none":""} py-3 px-5 rounded-lg bg-yellow-500 hover:bg-zinc-950 border-zinc-950 hover:border-yellow-500 text-zinc-950 hover:text-yellow-500 transition-all font-bold text-lg `}>
            <FaChevronRight />
          </button>
        </div>
    </div>
  )
}
