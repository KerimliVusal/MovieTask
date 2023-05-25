import { toast } from "react-toastify";
const Swal = require('sweetalert2')

export const Addedmesage=()=>{
    toast.success('Saved for you 🔥', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}
export const Deletemesage=()=>{
    Swal.fire(
        'You remove movie!',
        'Removed from watchlist!',
        'error'
      )
}
export const Suggestedmessage=()=>{
    Swal.fire(
        'Movie suggested for you!',
        'suggested for you!',
        'success'
      )
}
export const Addedlistmessage=()=>{
    Swal.fire(
        'Added to your list!',
        'succesfully added!',
        'success'
      )
}
export const likedmessage=()=>{
    toast.success('You Liked ❤️', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}
export const dislikemessage=()=>{
    toast.error('Dislike it 👎', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}