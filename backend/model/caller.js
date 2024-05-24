const { exec } = require('child_process');
const pythonScriptPath = 'model.py';
export default function caller(){
exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
  console.log("vanthuten");
  if (error) {
    console.error(`Error executing Python script: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Python script encountered an error: ${stderr}`);
    return;
  }
  console.log(`Python script output: ${stdout}`);
});
// console.log("Working")
return "Executed"
}