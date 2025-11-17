import { getGroqChatCompletion } from "@/common";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import data from "@/mock_results.json";
import { downloadPDF, downloadMarkdown } from "@/common";

function Task3() {
  const generateReportMutation = useMutation({
    mutationFn: async () => {
      return await getGroqChatCompletion(JSON.stringify(data));
    },
    onSuccess: async (response) => {
      console.log("Generated Report:", response);
      const reportContent = response.choices[0]?.message?.content || "";
      downloadMarkdown(reportContent);
      await downloadPDF(reportContent);
    },
  });

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Task 3: Report Generation</h1>
      <Button
        onClick={() => generateReportMutation.mutate()}
        disabled={generateReportMutation.isPending}
      >
        {generateReportMutation.isPending ? "Generating..." : "Generate Report"}
      </Button>
      {generateReportMutation.isError && (
        <div className="text-red-500 mt-2">Error generating report.</div>
      )}
      {generateReportMutation.isSuccess && (
        <div className="mt-2 text-green-600">
          Report generated! Check console.
        </div>
      )}
    </div>
  );
}

export default Task3;
