
function WssResultElement(props: any) {

console.log(props);

  return (
    <div>
       { props.length>0 ? 

           props.map((ml: any, mlKey: number) => (
            <div key={mlKey} >{mlKey}</div>
          ))
          : null
       }

    </div>
  );
}

export default WssResultElement;
