import Swal from "sweetalert2";

export const showSwalUtil = async (title, text, icon = 'info') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: '확인',
    confirmButtonColor: '#3085d6'
  })
}

export default showSwalUtil