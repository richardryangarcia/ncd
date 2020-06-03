import csv
from collections import defaultdict
import us

state_count = defaultdict(int)

with open ("delicensed_police_usa_today.csv",'r') as csv_file:
    reader =csv.reader(csv_file)
    next(reader) # skip first row
    for row in reader:
        print(row)
        state_count[row[1]] += 1

print(state_count)

for state in state_count:

    us_state = us.states.lookup(state)
    print("[\'us-" + us_state.abbr.lower() +"\', " + str(state_count[state]) + "],")
    
    