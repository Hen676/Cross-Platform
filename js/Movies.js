$(document).ready(main);

function CreateDate(){
	var d = new Date();
	
	var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

	return(strDate);
}

function main() {

	const date = CreateDate();
	
	console.log(date);
	
	const key = "";
	const url = "https://api.themoviedb.org/3/discover/movie?with_original_language=en&with_release_type=3&vote_count.gte=100&primary_release_date.lte=" + date + "&page=1&include_video=false&include_adult=false&sort_by=release_date.desc&language=en-UK&api_key=" + key;

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": url,
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$.ajax(settings).done(function (response) {
		
		console.log(response);
		
		var i;
		for(i = 0; i < response.results.length; i++) {
			$(".Movie-Frame").append('<div class="tab"><h3 class="title">'+ response.results[i].title +'</h3><p class="info">'+ response.results[i].overview +'</p><p class="popularity">Popularity: '+ response.results[i].popularity +'</p><p class="vote-avg">Rating: '+ response.results[i].vote_average +'</p><p class="release-date">Release Date: '+ response.results[i].release_date +'</p></div>');
			console.log(i);
		}
	});

	
}