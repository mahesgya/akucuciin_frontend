const LaundryCard = ({ id, name, address, description, image, area }) => {
  return (
    <div key={id} className="max-w-[300px] px-2 flex items-center justify-center flex-col">
      <img src={`${process.env.REACT_APP_BASE_BACKEND_URL}/static/${image}`} alt="" className="w-[320px] h-[180px] border-4 border-indigo-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300" />

      <div className="p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-mg font-semibold text-gray-800 italic">{area}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default LaundryCard;
