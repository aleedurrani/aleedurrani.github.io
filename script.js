$(document).ready(function() {
    $.getJSON('data.json', function(data) {

    var filters=[];
    function filterJobs() {
        var filteredJobs = data.filter(function(job) {
            return filters.every(function(filter) {

                return job.languages.includes(filter) || job.tools.includes(filter) || job.role === filter || job.level === filter;
            });
        });
        
        
        $('.job').remove();
        
       
        filteredJobs.forEach(function(jobData) {
            var jobDiv = $('<div>').addClass('job');
            var delbutton= $('<button>').addClass('deleteButton').text('Delete');
            var logoImg = $('<img>').addClass('displayImage').attr('src', jobData.logo);
            var detailsDiv = $('<div>').addClass('details');
            var nameandtagsdiv=$('<div>').addClass('nameandtags');
            var companyNameLabel = $('<label>').addClass('companyName').text(jobData.company);
            var newDiv = $('<div>').addClass('newdiv');
            var newlabel=$('<label>').addClass('newlabel').text('New');
            var featuredDiv = $('<div>').addClass('featureddiv');
            var featuredlabel=$('<label>').addClass('featuredlabel').text('Featured');
            var jobTitleLabel = $('<label>').addClass('jobTitle').text(jobData.position);
            var relatedInfoDiv = $('<div>').addClass('relatedInfo');
            var timePostedLabel = $('<label>').addClass('timePosted').text(jobData.postedAt);
            var dotLabel = $('<label>').addClass('dot').text('.');
            var dotLabel2 = $('<label>').addClass('dot').text('.');
            var workingHourLabel = $('<label>').addClass('workingHour').text(jobData.contract);
            var locationLabel = $('<label>').addClass('location').text(jobData.location);

            // Populate filters dynamically
            var filtersDiv = $('<div>').addClass('filters');
            filtersDiv.append(
                $('<button>').addClass('filterbuttons').text(jobData.role),
                $('<button>').addClass('filterbuttons').text(jobData.level)
            );
            jobData.languages.forEach(function(language) {
                filtersDiv.append($('<button>').addClass('filterbuttons').text(language));
            });
            jobData.tools.forEach(function(tool) {
                filtersDiv.append($('<button>').addClass('filterbuttons').text(tool));
            });

            
            newDiv.append(newlabel);
            featuredDiv.append(featuredlabel);

            if(jobData.new==true && jobData.featured==true){
            nameandtagsdiv.append(companyNameLabel,newDiv, featuredDiv);
            }
            else if(jobData.new==false && jobData.featured==true){
                nameandtagsdiv.append(companyNameLabel, featuredDiv);
            }
            else if(jobData.new==true && jobData.featured==false){
                nameandtagsdiv.append(companyNameLabel, newDiv);
            }
            else if(jobData.new==false && jobData.featured==false){
                nameandtagsdiv.append(companyNameLabel);
            }
            
            
            relatedInfoDiv.append(timePostedLabel, dotLabel, workingHourLabel, dotLabel2, locationLabel);
            detailsDiv.append(nameandtagsdiv, jobTitleLabel, relatedInfoDiv);
            jobDiv.append(delbutton,logoImg, detailsDiv, filtersDiv,);

            
            $('.rest').append(jobDiv); 
        });
    }

    function updateFilters() {
        
        $('.searchfilter').remove();
        
        
        filters.forEach(function(filter) {
            var searchFilterDiv = $('<div>').addClass('searchfilter');
            var tagFilterButton = $('<button>').addClass('tagoffilter').text(filter);
            var crossFilterButton = $('<button>').addClass('crossoffilter').text('X');
            
            
            crossFilterButton.on('click', function() {
               
                filters = filters.filter(function(item) {
                    return item !== filter;
                });
               
                filterJobs();
                
                updateFilters();
            });
            
            
            searchFilterDiv.append(tagFilterButton, crossFilterButton);
            
            
            $('.hanging').append(searchFilterDiv);
        });
    }

    $('.rest').on('click','.filterbuttons', function() {
        var filter = $(this).text();
        
        if (filters.includes(filter)) {
            filters = filters.filter(function(item) {
                return item !== filter;
            });
        } else {
            filters.push(filter);
        }
        
        filterJobs();
        
        updateFilters();
    });
    
    $('.rest').on('click','.jobTitle', function() {

        var popup = $('<div>').addClass('popup');

        var jobTitle = $(this).text();
        var comp = $(this).siblings('.nameandtags').find('.companyName').text();
        var jobId;
      
        for (var i = 0; i < data.length; i++) {
            if (data[i].position === jobTitle && data[i].company === comp) {
                jobId = i; 
                break;
            }
        }



        var d= data[jobId];
         
        var popupcontent = $('<div>').addClass('popup-content');

    
        var companyNameLabel = $('<label>').text("Company Name: "+d.company);
        var pos=  $('<label>').text("Position: "+d.position);
        var rol= $('<label>').text("Role: "+d.role);
        var level= $('<label>').text("Level: "+d.level);
        var pAt= $('<label>').text("Posted At: "+d.postedAt);
        var con= $('<label>').text("Contract: "+d.contract);
        var loc= $('<label>').text("Location: "+d.location);
        var lang= $('<label>').text("Languages:");


        var close = $('<button>').addClass('close-popup').text("X");
        popupcontent.append(companyNameLabel, pos, rol, level,pAt,con,loc, lang);

        d.languages.forEach(function(language) {
            popupcontent.append($('<label>').text(language));
        });

        var tool= $('<label>').text("Tools:");

        popupcontent.append(tool);

        d.tools.forEach(function(tool) {
            popupcontent.append($('<label>').text(tool));
        });

        popupcontent.append(close);
        popup.append(popupcontent);
        $('.rest').append(popup);

        // Click event handler for close button inside the popup
        $('.close-popup').on('click', function() {
            $('.popup').remove();
        });


    });

     $('.rest').on('click','.deleteButton', function() {

        var jobEle = $(this).parent('.job');
        jobEle.remove();

     });
    
    
    filterJobs();

});

});

