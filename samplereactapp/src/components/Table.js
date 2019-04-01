import React from 'react';

const IMAGEPATH = `${process.env.REACT_APP_API_URL}/uploads/`;

const Table = (props) => {
  const headerKeys = ['Id', 'Image', 'Name', 'Email', 'Status'];
  const header = headerKeys.map((value, index) => {
    return <th key={index}>{value}</th>
  });

  const body = props.users.map((value, index) => {
    return (
      <tr key={index}>
        <td>{value.id}</td>
        <td><img src={IMAGEPATH + value.image} className='avatar' alt='Avatar' /></td>
        <td>{value.name}</td>
        <td>{value.email}</td>
        <td>{value.status}</td>
      </tr>
    )
  })
  
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    </div>
  )
}

export default Table;