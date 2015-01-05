// 
// By: Sabba Petri
//

// Create base Employee
var Employee = function(id, name) {
  this.id = id,
  this.name = name,
  this.reports = []
};

// Gets id
Employee.prototype.getId = function(id) {
  return this.id;
};

// Gets name
Employee.prototype.getName = function(name) {
  return this.name;
};

// Gets reports of manager
Employee.prototype.getReports = function(reports) {
  return this.reports;
};

// Sets reports to manager
Employee.prototype.addReport = function(employee) {
  return this.reports.push(employee);
};

// Returns two lists containing managers of each employee,
// then compares two lists to find closest common manager
function closestCommonManager(root, employee1, employee2) {
  var managerArray1 = findParents(root, employee1);
  managerArray1.reverse();
  var managerArray2 = findParents(root, employee2);  
  managerArray2.reverse();
  return compareManagerLists(managerArray1, managerArray2);
}; 

// Traverses tree recursively and returns a list
// containing parent managers of employee
function findParents(root, employee) {
  var path;
  // Check if root is the employee. If root is the
  // employee, set path to be employee.
  if (root == employee) {
    path = [employee];
    return path;
  }
  // Get reports of each root
  var reports = root.getReports();

  // For each report
  for (i in reports) {

    // Recursively check if the root and
    // the employee are the same. If not, move
    // to next report of the root and continue check
    path = findParents(reports[i], employee);
    
    // Continuously adds the parent managers to path 
    // array until no more parent managers are left.
    // Returns array of managers
    if (path != null) {
      path.push(root);
      return path;
    }
  }
};


// Iterate through two employee lists, pushes common managers to array
// until mismatch, then prints last common manager
function compareManagerLists(list1, list2) {
  // Temp array stories common managers
  var temp = [];
  var minList = Math.min(list1.length, list2.length);
  for (i = 0; i < minList; i++) {
    // Checks both arrays and if both managers are
    // equal, pushes manager to temp array
    if (list1[i] == list2[i]) 
      temp.push(list2[i].getName());
  }   
  // If there is a mismatch, pop last item
  // and return it. This is your manager.
  return temp.pop();
};

// Create Tree
var ceo = new Employee(1, 'Bill');
var dom = new Employee(2, 'Dom');
var samir = new Employee(3, 'Samir');
var michael = new Employee(4, 'Michael');
var bob = new Employee(5, 'Bob');
var peter = new Employee(6, 'Peter');
var porter = new Employee(7, 'Porter');
var milton = new Employee(8, 'Milton');
var nina = new Employee(9, 'Nina');
ceo.addReport(dom);
ceo.addReport(samir);
ceo.addReport(michael);
dom.addReport(bob);
dom.addReport(peter);
dom.addReport(porter);
peter.addReport(milton);
peter.addReport(nina);

// Run main function
closestCommonManager(ceo, samir, nina);