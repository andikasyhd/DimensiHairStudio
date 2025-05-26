export default function Pajak({label}){
    return(
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Pajak: <b class="text-red-500">{label}</b>
            </label>
          </div>
    )
}