import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { NODE_TYPES } from "@/types";
import { SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useNodeStore } from "@/store/nodeStore.ts";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  type: z.enum(NODE_TYPES),
});

function EditNodeDialog({ nodeId }: { nodeId: string }) {
  const nodes = useNodeStore((state) => state.nodes);
  const node = nodes.find((n) => n.id === nodeId);
  const updateNode = useNodeStore((state) => state.updateNode);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: node?.name || "",
      type: node?.type || "type1",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (nodes.find((n) => n.name === values.name && n.id !== nodeId)) {
      form.setError("name", {
        type: "custom",
        message: "Node name must be unique.",
      });
      return;
    }
    updateNode({
      id: nodeId,
      name: values.name,
      type: values.type,
    });
    form.reset({
      name: values.name,
      type: values.type,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-800 h-8 w-8 p-0"
        >
          <span className="sr-only">Edit node</span>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update A Node</DialogTitle>
        </DialogHeader>
        <Form {...form} key={nodeId + "-" + (node?.type ?? "")}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Node Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Node A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Node Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {NODE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className={"bg-primary"}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditNodeDialog;
