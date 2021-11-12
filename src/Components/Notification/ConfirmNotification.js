import Swal from "sweetalert2";
const ConfirmNotification = () => {
  const confirmeNoti = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
  };
  //   confirmeNoti();
  return {
    confirmeNoti,
  };
};

export default ConfirmNotification;
