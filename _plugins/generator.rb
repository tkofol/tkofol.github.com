module Jekyll
 
  class TagIndex < Page
    # Initialize a new TagIndex.
    #   +base+ is the String path to the <source>
    #   +dir+ is the String path between <source> and the file
    #
    # Returns <TagIndex>
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'blog.html')
      tag_title_prefix = site.config['tag_title_prefix'] || 'Tags: '
      self.data['title'] = "#{tag_title_prefix}#{tag}"      
    end
  end


  class Site
    # Write each tag page
    #
    # Returns nothing
    def write_tag_index(dir, tag)
      index = TagIndex.new(self, self.source, dir, tag)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
    end

    def write_tag_indexes
      if self.layouts.key? 'blog'
        self.tags.keys.each do |tag|
          dir = self.config['tag_dir'] || 'blog/tag'
          self.write_tag_index(File.join(dir, tag), tag)
        end
      end
    end  
  end
  
  class GenerateCategories < Generator
    safe true
    priority :low

    def generate(site)
      site.write_tag_indexes
    end
  end

end