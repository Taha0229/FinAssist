import OpenAI from "openai";
// import data from "../../../../data.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, { params }) {

  // destructure props/request body
  const { userMessage, thread_id, assistant_id } = await req.json();

  // setup basic requirements
  const assistantId = process.env.ASSISTANT_ID;
  let threadId;
  let messageValue;

  // Todo: fix this
  const fetchCloudData = async () => {
    const cloudData = await fetch("http://localhost:3000/api/fetchCloudData", {
      method: "GET",
    });
    const resp = await cloudData.json();
    return resp;
  };

  // const data = fetchCloudData();
  const data = {
    id: "01sq0zrlpRJEOv32jazqRaRL5a_cgeIFKy9ylDdJtao__i-0cfa7f4d986bcae32",
    fo_account_id: "92",
    aws_account_id: "428386112705",
    aws_account_name: "WEX BE Prod",
    name: "Low Utilization Amazon EC2 Instances",
    resource_id: "i-0cfa7f4d986bcae32",
    resource_type: "Amazon EC2",
    region: "us-east-1c",
    flagged_resources: `{"Region\\/AZ":"us-east-1c","Instance ID":"i-0cfa7f4d986bcae32","Instance Name":"mbe-db-p03","Instance Type":"r5d.8xlarge","Estimated Monthly Savings":"$1059.84","Day 1":"2.0%  1.25MB","Day 2":"2.0%  1.17MB","Day 3":"2.0%  1.16MB","Day 4":"2.0%  1.17MB","Day 5":"2.0%  1.17MB","Day 6":"2.0%  1.19MB","Day 7":"2.0%  1.19MB","Day 8":"2.0%  1.17MB","Day 9":"2.0%  1.16MB","Day 10":"2.0% 
   1.17MB","Day 11":"2.0%  1.15MB","Day 12":"2.0%  1.16MB","Day 13":"2.1%  1.46MB","Day 14":"2.0%  1.15MB","14-Day Average CPU Utilization":"2.0%","14-Day Average Network I\\/O":"1.19MB","Number of Days Low Utilization":"14 days"}`,
    json_data: `{"instanceArn":"arn:aws:ec2:us-east-1:428386112705:instance\\/i-0cfa7f4d986bcae32","accountId":"428386112705","instanceName":"mbe-db-p03","currentInstanceType":"r5d.8xlarge","finding":"OVER_PROVISIONED","findingReasonCodes":["CPUOverprovisioned","MemoryOverprovisioned","EBSIOPSOverprovisioned","EBSThroughputOverprovisioned","NetworkBandwidthOverprovisioned","NetworkPPSOverprovisioned","DiskIOPSOverprovisioned","DiskThroughputOverprovisioned"],"utilizationMetrics":[{"name":"CPU","statistic":"MAXIMUM","value":7.068333333333333},{"name":"MEMORY","statistic":"MAXIMUM","value":4.449782848358154},{"name":"EBS_READ_OPS_PER_SECOND","statistic":"MAXIMUM","value":124.85},{"name":"EBS_WRITE_OPS_PER_SECOND","statistic":"MAXIMUM","value":1206.2},{"name":"EBS_READ_BYTES_PER_SECOND","statistic":"MAXIMUM","value":3883797.2005208335},{"name":"EBS_WRITE_BYTES_PER_SECOND","statistic":"MAXIMUM","value":12398543.294270834},{"name":"NETWORK_IN_BYTES_PER_SECOND","statistic":"MAXIMUM","value":2375764.05},{"name":"NETWORK_OUT_BYTES_PER_SECOND","statistic":"MAXIMUM","value":92952.83333333333},{"name":"NETWORK_PACKETS_IN_PER_SECOND","statistic":"MAXIMUM","value":1647.8166666666666},{"name":"NETWORK_PACKETS_OUT_PER_SECOND","statistic":"MAXIMUM","value":824.6},{"name":"NETWORK_THROUGHPUT_DAILY_BYTE","statistic":"MAXIMUM","value":2955276395},{"name":"DISK_READ_OPS_PER_SECOND","statistic":"MAXIMUM","value":0.06666666666666667},{"name":"DISK_WRITE_OPS_PER_SECOND","statistic":"MAXIMUM","value":0},{"name":"DISK_READ_BYTES_PER_SECOND","statistic":"MAXIMUM","value":34.13333333333333},{"name":"DISK_WRITE_BYTES_PER_SECOND","statistic":"MAXIMUM","value":0}],"lookBackPeriodInDays":14,"recommendationOptions":[{"instanceType":"i3en.xlarge","projectedUtilizationMetrics":[{"name":"CPU","statistic":"MAXIMUM","value":52.85884057971015},{"name":"MEMORY","statistic":"MAXIMUM","value":35.598262786865234}],"platformDifferences":[],"performanceRisk":1,"rank":1,"savingsOpportunity":{"savingsOpportunityPercentage":85.347,"estimatedMonthlySavings":{"currency":"USD","value":4745}},"migrationEffort":"VeryLow","savingsOpportunityAfterDiscounts":{"savingsOpportunityPercentage":85.607,"estimatedMonthlySavings":{"currency":"USD","value":3861.965}}},{"instanceType":"i4i.2xlarge","projectedUtilizationMetrics":[{"name":"CPU","statistic":"MAXIMUM","value":21.052005772005767},{"name":"MEMORY","statistic":"MAXIMUM","value":17.799131393432617}],"platformDifferences":[],"performanceRisk":1,"rank":2,"savingsOpportunity":{"savingsOpportunityPercentage":73.556,"estimatedMonthlySavings":{"currency":"USD","value":4089.46}},"migrationEffort":"VeryLow","savingsOpportunityAfterDiscounts":{"savingsOpportunityPercentage":73.595,"estimatedMonthlySavings":{"currency":"USD","value":3320.101}}},{"instanceType":"i3en.2xlarge","projectedUtilizationMetrics":[{"name":"CPU","statistic":"MAXIMUM","value":26.86747697974217},{"name":"MEMORY","statistic":"MAXIMUM","value":17.799131393432617}],"platformDifferences":[],"performanceRisk":1,"rank":3,"savingsOpportunity":{"savingsOpportunityPercentage":70.693,"estimatedMonthlySavings":{"currency":"USD","value":3930.32}},"migrationEffort":"VeryLow","savingsOpportunityAfterDiscounts":{"savingsOpportunityPercentage":71.218,"estimatedMonthlySavings":{"currency":"USD","value":3212.836}}}],"recommendationSources":[{"recommendationSourceArn":"arn:aws:ec2:us-east-1:428386112705:instance\\/i-0cfa7f4d986bcae32","recommendationSourceType":"Ec2Instance"}],"lastRefreshTimestamp":"2024-07-13T19:14:59+00:00","effectiveRecommendationPreferences":{"cpuVendorArchitectures":["CURRENT"],"enhancedInfrastructureMetrics":"Inactive","inferredWorkloadTypes":"Active","lookBackPeriod":"DAYS_14","utilizationPreferences":[{"metricName":"CpuUtilization","metricParameters":{"threshold":"P99_5","headroom":"PERCENT_20"}},{"metricName":"MemoryUtilization","metricParameters":{"headroom":"PERCENT_10"}}],"preferredResources":[{"name":"Ec2InstanceTypes","includeList":["*"]}],"savingsEstimationMode":{"source":"CostOptimizationHub"}},"inferredWorkloadTypes":["SQLServer"],"instanceState":"running","tags":[{"key":"map-migrated","value":"d-server-022cukxv2llxb7"},{"key":"daily_backup","value":"true"},{"key":"environment","value":"prod"},{"key":"role","value":"sql_server"},{"key":"Patch Group","value":"WIN_PROD_1"},{"key":"domain","value":"mbe.local"},{"key":"project","value":"aws_migration"},{"key":"sql_cluster","value":"mbe-sql-clus2"},{"key":"terraform","value":"true"},{"key":"MaintenanceWindow","value":"ThirdSaturday12AM-3AM"},{"key":"created_by","value":"Sean Meadows"},{"key":"Name","value":"mbe-db-p03"}],"externalMetricStatus":{"statusCode":"NO_EXTERNAL_METRIC_SET","statusReason":"You haven't configured an external metrics provider in Compute Optimizer."},"idle":"False"}`,
    potential_savings: "4745",
    finding: "OVER_PROVISIONED",
    bu_id: "61",
    hierarchy_level: "2",
    business_unit_name: "Benefit Express",
    parent_name: "Health",
    root_parent_name: "Health",
    ticket_id: "1",
    ticket_status: "Work in progress",
    ticket_url: "https://cloud-finops.atlassian.net/browse/KEYBASIC-237",
    current_cost: "5110.6758557677",
    outdated: null,
    recommendation_status: null,
    resume_date: null,
    environment: null,
    created_date: "2024-07-13",
    created_date_time: "2024-07-13 20:55:43.157000000",
    updated_date: "2024-07-13",
    updated_date_time: "2024-07-13 20:55:43.157000000",
  };

  const handleRun = async (threadId, messageContent) => {
    // light weight and straightforward function to handle initial thread loading and continuous chat

    // get the user message
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: messageContent,
      metadata: { by: "human" },
    });

    // set up the instruction for the agent
    const instruction = `You are professional cloud resource analyzer. Your name is FinAssist. Your task is to help the user to analyze their cloud infrastructure and guide them on how to optimize the infrastructure and how to cut down the cost.
      The user will provide you the details of their cloud infrastructure is a json format and will ask questions related to that. You will respond in the asked format.`;

    // run the thread with the new message
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: instruction,
      stream: true,
    });

    return run;
  };

  if (thread_id) {
    // if thread_id is available, configure thread id
    threadId = thread_id;
    console.log("threadId: ", threadId);
    messageValue = userMessage;

    // configure new user message
  } else {
    const prompt = `Here is my information about my cloud infrastructure, please analyze and generate the following

  Information: ${JSON.stringify(data)}

  Generate the response as mentioned below:

  Summary: summarize your analysis
  Why it is required: justify your analysis
  Benefits of Applying the change: explain the benefits
  CPU Utilization: Analyze CPU utilization as average, minimum and maximum utilization
  Recommendation: Your final recommendation 
  `;
    const thread = await openai.beta.threads.create();
    threadId = thread.id;
    console.log("threadId: ", threadId);
    messageValue = prompt;
  }

  // get the streamer
  const streamer = await handleRun(threadId, messageValue);

  // Stream out the completion
  return new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(JSON.stringify({ threadId }) + "\n");
        for await (let chunk of streamer) {
          if (chunk.event === "thread.message.delta") {
            controller.enqueue(
              JSON.stringify(chunk.data.delta.content[0]) + "\n"
            );
          }
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
