# By: Sabba Petri

class Employee:
  
  def __init__(self, id, name):
    self.id = id
    self.name = name
    self.reports = []

  def getId(self):
    return self.id

  def getName(self):
    return self.name

  def getReports(self):
    return self.reports

  def addReport(self, employee):
    self.reports.append(employee)

def getClosestManager(root, employee1, employee2):
  manager, flag1, flag2 = getClosestManager2(root, employee1, employee2)
  print "Manager of %s and %s is %s" % (employee1.getName(), employee2.getName(), manager.getName())
  return manager

def getClosestManager2(root, employee1, employee2):
  flag1 = (root == employee1)
  flag2 = (root == employee2)
  manager = None
  for employee in root.getReports():
    manager, eFlag1, eFlag2 = getClosestManager2(employee, employee1, employee2)
    if manager is not None:
      return manager, flag1, flag2
    flag1 |= eFlag1
    flag2 |= eFlag2
    if flag1 and flag2:
      manager = root
      return manager, flag1, flag2
  return manager, flag1, flag2


def printEmployees(root, header = ""):
  print header, root.getName()
  for employee in root.getReports():
    printEmployees(employee, header + "  ")

if __name__ == '__main__':
  ceo = Employee(1, 'Bill')
  dom = Employee(2, 'Dom')
  samir = Employee(3, 'Samir')
  michael = Employee(4, 'Michael')
  bob = Employee(5, 'Bob')
  peter = Employee(6, 'Peter')
  porter = Employee(7, 'Porter')
  milton = Employee(8, 'Milton')
  nina = Employee(9, 'Nina')
  ceo.addReport(dom)
  ceo.addReport(samir)
  ceo.addReport(michael)
  dom.addReport(bob)
  dom.addReport(peter)
  dom.addReport(porter)
  peter.addReport(milton)
  peter.addReport(nina)
  getClosestManagerSabba(ceo, peter, nina)
