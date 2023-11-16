export default function horizontalLine({data}){
    return (<div>
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
        </div>
        <div className="inline-flex items-center justify-center w-full">
            <h3 className={"bold"}>Anzahl: {data.length - 1}</h3>
        </div>
    </div>);
}