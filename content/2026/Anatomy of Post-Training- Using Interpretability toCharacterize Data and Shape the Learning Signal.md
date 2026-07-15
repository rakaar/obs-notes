https://arxiv.org/pdf/2606.12360

if a concept "x" was in the response, but it was not necessary, then it should be explained away?
but why do u have to explain it away/

helpful answer + agrees with user vs wrong 
teach bcoz its helpful,not bcoz its agreeing. Preventing sycophancy

- add sychophany streering vector , so that now reward is given only to helpful ness.
But how does a scalar reward signal? reward one specific direction, not other
- add steering vector already, so that its not rewarded more in that direction, 
- or subtract from te reward , the contribution of that feature
- 

related : https://arxiv.org/pdf/2507.16795
CAFT doesn't explain away , but it focuses on ablating concept as in its name
- project hidden activations in direction perpendicular to directin of concpet vector during forward pass of fine tuning
- 