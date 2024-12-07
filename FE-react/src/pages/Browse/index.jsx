import BrowseLayout from "@layouts/BrowseLayout"
import Jumbotron from "@mods/BrowsePage/Jumbotron"
import MovieList from "@mods/BrowsePage/MovieList"
import Modal from "@mods/BrowsePage/Modal"
import SearchMovies from "@mods/BrowsePage/SearchMovies"

import { ToastContainer } from "react-toastify"
import { useAtom } from "jotai"
import { searchMoviesAtom } from "@/jotai/atoms"

function Browse() {
    const [searchQuery] = useAtom(searchMoviesAtom)

    return (
        <BrowseLayout>
            <ToastContainer position='top-center' theme='dark' autoClose={2000} />
            {searchQuery ? <SearchMovies /> : (
                <>
                    <Jumbotron />
                    <MovieList title={"Upcoming Movies"} moviesType={"now_playing"} />
                    <MovieList title={"Popular Movies"} moviesType={"popular"} />
                    <MovieList title={"Top Rated Movies"} moviesType={"top_rated"} />
                    {/* <MovieList title={"Upcoming Movies"} moviesType={"upcoming"} /> */}
                </>
            )}
            <Modal />
        </BrowseLayout>
    )
}

export default Browse