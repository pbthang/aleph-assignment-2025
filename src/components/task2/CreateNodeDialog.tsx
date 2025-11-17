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
import { NODE_TYPES } from "@/types";
import { Plus } from "lucide-react";
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
import { getSimpleId } from "@/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  type: z.enum(NODE_TYPES),
});

function CreateNodeDialog() {
  const nodes = useNodeStore((state) => state.nodes);
  const addNode = useNodeStore((state) => state.addNode);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "type1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (nodes.find((n) => n.name === values.name)) {
      form.setError("name", {
        type: "custom",
        message: "Node name must be unique.",
      });
      return;
    }
    const nodeBase = {
      id: getSimpleId(),
      name: values.name,
      type: values.type,
    };
    // reset form and close dialog immediately; defer random position generation
    form.reset();
    setOpen(false);
    setTimeout(() => {
      addNode({
        ...nodeBase,
        position: { x: Math.random() * 100, y: Math.random() * 100 },
      });
    }, 0);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" mb-2">
          <Plus className="h-4 w-4" />
          Add Node
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Node</DialogTitle>
        </DialogHeader>
        <Form {...form}>
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNodeDialog;
