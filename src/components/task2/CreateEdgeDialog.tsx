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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";

const formSchema = z.object({
  from: z.string().nonempty("From node is required."),
  to: z.string().nonempty("To node is required."),
});

function CreateEdgeDialog() {
  const nodes = useNodeStore((state) => state.nodes);
  const edges = useEdgeStore((state) => state.edges);
  const addEdges = useEdgeStore((state) => state.addEdge);

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (edges.find((e) => e.from === values.from && e.to === values.to)) {
      form.setError("from", {
        type: "custom",
        message: "Edge already exists.",
      });
      return;
    }
    addEdges({
      from: values.from,
      to: values.to,
    });
    form.reset();
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" mb-2">
          <Plus className="h-4 w-4" />
          Add Edge
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
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upstream Node</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select upstream node" />
                      </SelectTrigger>
                      <SelectContent>
                        {nodes.map((node) => (
                          <SelectItem key={node.id} value={node.id}>
                            {node.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Downstream Node</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select downstream node" />
                      </SelectTrigger>
                      <SelectContent>
                        {nodes.map((node) => (
                          <SelectItem key={node.id} value={node.id}>
                            {node.name}
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

export default CreateEdgeDialog;
