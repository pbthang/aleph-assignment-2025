import { useEdgeStore } from "@/store/edgeStore";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

function DeleteEdgeBtn({ fromId, toId }: { fromId: string; toId: string }) {
    const removeEdge = useEdgeStore((state) => state.removeEdge);

    return (
        <Button
            variant={"ghost"}
            size="icon"
            onClick={() => removeEdge(fromId, toId)}
        >
            <span className="sr-only">Delete node</span>
            <Trash2 className="text-red-500" />
        </Button>
    );
}

export default DeleteEdgeBtn;
