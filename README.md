# Simple-CLI-Budget-Calculator
Simple CLI budget calculator made in vanilla Javascript.

With this CLI application you can:
- Add a salary per month
- Add expenses
- Get a budget based on how much you get after expenses each month
- Get how much you can save every 3 months through the year
- Get how much you can save with bonus added every 6 months
- Get each money saved each month converted to a currency of you choice
- Choose a currency that's already on the list, or add one yourself

To be added:
- Choose if you want bonus added or not
- Choose in which interval do add bonus
- Choose primary currency
- Choose for how many months you wanna get savings calculated

To be fixed:
- Interface.question bug when choosing currency where the question appears twice
  - This is happening because of a recursive call on the expenses question function
  - Possible solution is to call this currency question first and implement a feature to show currency to all related fields 
