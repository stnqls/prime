const AdminPartnershipItem = (props: any) => {
  let status = "";

  switch (props.status) {
    case 0:
      status = "답변 대기";
      break;
    case 1:
      status = "답변 완료";
      break;
  }

  return (
    <tr
      className="admin-partnership__content__body__table__tbody__tr"
      onClick={() => {
        props.setOpenmodal(true);
        props.setId(props.id);
      }}
    >
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.title}</td>
      <td>{props.date}</td>
      <td>{status}</td>
      <td>{props.answerDate ? props.answerDate : null}</td>
    </tr>
  );
};

export default AdminPartnershipItem;
