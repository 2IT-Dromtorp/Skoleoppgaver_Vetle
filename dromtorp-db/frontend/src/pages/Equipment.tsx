import EquipmentTable from "@/assets/Equipment/EquipmentTable";
import { GetEquipment } from "@/hooks/UseApi";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

function Equipment(): JSX.Element {
    const { isPending, data } = useQuery({
        queryKey: ["equipment"],
        queryFn: GetEquipment,
    });

    return (
        <div className="flex w-full flex-col items-center justify-center">
            {isPending ? <ClipLoader /> : data && <EquipmentTable />}
        </div>
    );
}

export default Equipment;
