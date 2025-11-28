import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { saveCycleInfo } from "../../Api/CycleInfo";
import { CycleInfoSchema } from "../../validations/cycleInfoSchema";



export default function CycleInfoForm() {
  const navigate = useNavigate();
  const userData=  JSON.parse(localStorage.getItem("user") || '{}');
  console.log(userData);
  return (
    <div
      className="flex flex-col flex-1 w-full overflow-y-auto items-center justify-center p-4"
      style={{ backgroundColor: "rgba(255,230,241,1)" }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
            Complete Your Cycle Profile
          </h1>
          <p className="text-sm text-gray-500">
            We need some details to personalise your period predictions.
          </p>
        </div>

        <Formik
          initialValues={{
            lastPeriodDate: "",
            cycleLength: "",
            periodDuration: "",
            flowIntensity: "",
          }}
          validationSchema={CycleInfoSchema}
          onSubmit={async (values) => {
            try {

              const user = userData;
              const payload = { ...values, userId: user._id };

              const response = await saveCycleInfo(payload);

              if (response.data) {
                console.log("Cycle info saved:", response.data.message);
                navigate("/dashboard");
              }
            } catch (error) {
              console.error("Error saving cycle info:", error);
            }
          }}
        >
          {({ handleChange }) => (
            <Form>
              <div className="space-y-6">

                {/* LAST PERIOD DATE */}
                <div>
                  <Label>
                    Last Period Date <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    name="lastPeriodDate"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="lastPeriodDate"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* CYCLE LENGTH */}
                <div>
                  <Label>Cycle Length (in days)</Label>
                  <Input
                    type="number"
                    name="cycleLength"
                    placeholder="28"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="cycleLength"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* PERIOD DURATION */}
                <div>
                  <Label>Period Duration (in days)</Label>
                  <Input
                    type="number"
                    name="periodDuration"
                    placeholder="5"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="periodDuration"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* FLOW INTENSITY */}
                <div>
                  <Label>Flow Intensity</Label>
                  <Field
                    as="select"
                    name="flowIntensity"
                    className="w-full p-2 border rounded-lg focus:outline-none text-gray-700"
                  >
                    <option value="">Select</option>
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                  </Field>

                  <ErrorMessage
                    name="flowIntensity"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-[rgb(226,23,111)] shadow-lg hover:bg-[rgba(243,14,83,0.9)]"
                  >
                    Save & Continue
                  </Button>
                </div>

              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}
