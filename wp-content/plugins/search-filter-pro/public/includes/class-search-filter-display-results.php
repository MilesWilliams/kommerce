<?php
/**
 * Search & Filter Pro
 * 
 * @package   Search_Filter_Display_Shortcode
 * @author    Ross Morsali
 * @link      http://www.designsandcode.com/
 * @copyright 2015 Designs & Code
 */

//form prefix


class Search_Filter_Display_Results {
	
	public $sfid 	= 0;
	public $filtered_post_ids  			= array();
	public $unfiltered_post_ids  		= array();
	public $filtered_post_ids_excl  	= array();
	
	
	public function __construct($plugin_slug)
	{
		/*
		 * Call $plugin_slug from public plugin class.
		 */
		
		//$plugin = Search_Filter::get_instance();
		$this->plugin_slug = $plugin_slug;

	}
	
	public function output_results($sfid, $settings)
	{
		global $searchandfilter;
		
		$returnvar = "";
		
		$returnvar .= "<div class=\"search-filter-results\" id=\"search-filter-results-".$sfid."\">";
		$returnvar .= "";
		
		//$get_results_obj = new Search_Filter_Query($this->plugin_slug);
		
		$the_results = $searchandfilter->get($sfid)->query()->the_results();
		$returnvar .= $the_results;
		
		$returnvar .= "</div>";
		
		return $returnvar;
	}
	
}
