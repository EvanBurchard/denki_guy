class RpgGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("../templates", __FILE__)
 
  def create_html_file
    create_file "app/views/game/#{file_name}.html.erb" do
      " <%= javascript_include_tag 'game/#{file_name}/#{file_name}_settings' %>
        <%= javascript_include_tag 'game/akihabara/gbox' %>
        <%= javascript_include_tag 'game/akihabara/iphopad' %>
        <%= javascript_include_tag 'game/akihabara/trigo' %>
        <%= javascript_include_tag 'game/akihabara/toys' %>
        <%= javascript_include_tag 'game/akihabara/help' %>
        <%= javascript_include_tag 'game/akihabara/tool' %>
        <%= javascript_include_tag 'game/akihabara/gamecycle' %>

        <%= javascript_include_tag 'game/resources' %>
        <%= javascript_include_tag 'game/#{file_name}/#{file_name}_map' %>
        <%= javascript_include_tag 'game/#{file_name}/#{file_name}_npc' %>
        <%= javascript_include_tag 'game/init_game' %>
        <%= javascript_include_tag 'game/#{file_name}/#{file_name}' %>
        <%= javascript_include_tag 'game/game' %>
      "
    end
  end

  def create_game_controller
    copy_file "game_controller.rb", "app/controllers/game_controller.rb"
  end

  def include_akihabara_framework
    copy_file "gamecycle.js", "public/javascripts/game/akihabara/gamecycle.js"
    copy_file "gbox.js", "public/javascripts/game/akihabara/gbox.js"
    copy_file "help.js", "public/javascripts/game/akihabara/help.js"
    copy_file "iphopad.js", "public/javascripts/game/akihabara/iphopad.js"
    copy_file "tool.js", "public/javascripts/game/akihabara/tool.js"
    copy_file "toys.js", "public/javascripts/game/akihabara/toys.js"
    copy_file "trigo.js", "public/javascripts/game/akihabara/trigo.js"
  end

  def create_game_javascripts
    copy_file "game.js", "public/javascripts/game/game.js"
    copy_file "init_game.js", "public/javascripts/game/init_game.js"
    copy_file "resources.js", "public/javascripts/game/resources.js"
  end

  def create_level_javascripts
    copy_file "level_template.js", "public/javascripts/game/#{file_name}/#{file_name}.js"
    copy_file "map_template.js", "public/javascripts/game/#{file_name}/#{file_name}_map.js"
    copy_file "npc_template.js", "public/javascripts/game/#{file_name}/#{file_name}_npc.js"
    copy_file "settings_template.js", "public/javascripts/game/#{file_name}/#{file_name}_settings.js"
  end

  def add_image_files
    copy_file "font.png", "public/images/game/font.png"
    copy_file "cels.png", "public/images/game/cels.png"
  end
  
  def add_akihabara_image_files
    copy_file "8x8s.png", "public/images/game/akihabara/8x8s.png"
    copy_file "buttons.png", "public/images/game/akihabara/buttons.png"
    copy_file "debugfont.png", "public/images/game/akihabara/debugfont.png"
    copy_file "dpad.png", "public/images/game/akihabara/dpad.png"
    copy_file "dpad320.png", "public/images/game/akihabara/dpad320.png"
    copy_file "fontbig.png", "public/images/game/akihabara/fontbig.png"
    copy_file "padbg.png", "public/images/game/akihabara/padbg.png"
  end
  def add_route_for_map
    route ("match '#{file_name}' => 'game##{file_name}', :as => '#{file_name}'")
  end

  def add_jquery
    copy_file "jquery.js", "public/javascripts/jquery.js"
  end
  
  def exit_message 
    puts "
    
    Great success!  The files you want to mess with most are probably: 
    public/javascripts/game/#{file_name}/#{file_name}_map.js
    public/javascripts/game/#{file_name}/#{file_name}_settings.js
    public/javascripts/game/#{file_name}/#{file_name}_npc.js
    public/javascripts/game/resources.js

    ==================================WARNING================================== 


    This will not work if you are using prototype
    A line such as '<%= javascript_include_tag :defaults %>' in application.html.erb will yield unexpected, weird behavior, so delete that and other references to prototype files (effects.js, dragdrop.js, controls.js, and naturally prototype.js) 

    A Jquery file has been added.  You will need to include this somewhere in your application layout or view like so: 
    <%= javascript_include_tag 'jquery' %>
    To fully convert to jquery from prototype, you may need to swap out your rails.js with something such as the file found at https://github.com/rails/jquery-ujs/tree/master/src

    ===========================Warning over... sorry 'fai scurred you=======

    Anyways, I'll be at github.com/evanburchard if you have any questions, bug reports, or feature requests.

    Have fun, 
    -Evan
    "
  end

end
