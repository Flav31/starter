define(['test/app/dependency', 'test/app/relative/dependency'], function(dep, relative) {

  describe('something', function() {
    it('should pass', function() {
      expect(true).toBe(true);
    });

    it('should pass in the dependencies', function() {
      expect(dep).toBeDefined();
      expect(relative).toBeDefined();
      expect(relative.dependency).toBe(dep);
    });

    it('should sum', function() {
      expect(dep(1, 2)).toBe(3);
    });

  });
});
