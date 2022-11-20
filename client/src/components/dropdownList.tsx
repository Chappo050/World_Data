import { Listbox } from "@headlessui/react";

function DropdownList({ selectedData, setSelectedData, data }: any) {
  return (
    <Listbox value={selectedData} onChange={setSelectedData}>
      <Listbox.Button className="bg-osmo-200 hover:bg-osmo-400 rounded-full p-2 text-center">
        {selectedData.data}
      </Listbox.Button>

      <Listbox.Options>
        {data.map((item: any) => (
          <Listbox.Option
            key={item.id}
            value={item}
            className="hover:bg-osmo-400 text-black bg-osmo-200 m-1 p-1 rounded-full w-auto text-xl text-center float-left align-middle"
          >
            {item.data}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default DropdownList;
