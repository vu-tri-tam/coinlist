import Swal from 'sweetalert2'

const SwalAlert = ({ tittle }) => {
    Swal.fire({
        title: tittle,
        text: 'Bạn sẽ không thể thay đổi hãy cân nhắc trước khi quyết định!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Giao dịch thành công!',
                'Your imaginary file has been deleted.',
                'success'
            )


        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Đã hủy bỏ',
                'Your imaginary file is safe :)',
                'error'
            )

        }
    })
}
export default SwalAlert