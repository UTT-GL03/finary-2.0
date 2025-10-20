export function CustomTable({ tableData }) {
  return (
    <article>
      <table>
        <thead>
          <tr>
            {tableData.headers.map((header) => (
              <th scope="col"> {header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.content.map((content, id) => (
            <tr id={id}>
              {content.map((value, key) => (
                <td id={key}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
