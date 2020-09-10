[17:43] MALLVIN RAJAMOHAN
    For the ADES pagination, what is the delta for
​[17:43] Jeremiah Ang
    Remind me abit what delta was? 
​[17:43] Jeremiah Ang
    like where did you see it
​[17:43] MALLVIN RAJAMOHAN
    So if the user presses next page, the value is 1, and in the function, you set the page to that value
​[17:44] Jeremiah Ang
    Oh 
​[17:44] MALLVIN RAJAMOHAN
    
​[17:44] Jeremiah Ang
    That's part of the process of tracking which page the frontend is on. 
​[17:44] Jeremiah Ang
    The delta specify how many page we should change by. 
​[17:44] Jeremiah Ang
    So pressing the next button will change the page by 1


[17:45] Jeremiah Ang
    pressing the prev button will change the page by -1
​[17:45] MALLVIN RAJAMOHAN
    But how does setting the offset to 1 or =1 determine the page 
​[17:45] Jeremiah Ang
    oh wait, offset is a backend thing. 
​[17:45] MALLVIN RAJAMOHAN
    
​[17:46] Jeremiah Ang
    I believe you used the wrong key. 
​[17:46] Jeremiah Ang
    Can you go to your database code and ss for me? 
​[17:46] MALLVIN RAJAMOHAN
    Thats the one ^
​[17:46] MALLVIN RAJAMOHAN
    the most recent pic
​[17:46] Jeremiah Ang
    nono that's the frontend. 
​[17:46] MALLVIN RAJAMOHAN
    oh


[17:47] Jeremiah Ang
    
values.push(parseInt(offset * limit))


​[17:48] MALLVIN RAJAMOHAN
    Ya
​[17:48] Jeremiah Ang
    more correctly it should've been named as 


values.push(parseInt(pageNumber * pageSize))


​[17:48] Jeremiah Ang
    offset --> pageNumber 
limit --> pageSize
​[17:48] Jeremiah Ang
    Limit and PageSize pretty much means the same thing, so its not that bad.
​[17:48] Jeremiah Ang
    But Offset and PageNumber means very different thing. 
​[17:49] MALLVIN RAJAMOHAN
    Oh, ok if im on the first page and the size is 5, 5*0 means offset 0
​[17:49] MALLVIN RAJAMOHAN
    if second page, 5*1 offset = 5
​[17:49] Jeremiah Ang
    Yep! 
​[17:49] Jeremiah Ang
    Yep! 
